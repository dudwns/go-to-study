const fs = require("fs"); //파일에 접근할 수 있는 라이브러리를 불러옴
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { login, accessToken, refreshToken, loginSuccess, logout } = require("./controller");
const jwt = require("jsonwebtoken");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

const data = fs.readFileSync("./database.json"); //datatase.json 파일을 읽어옴
const conf = JSON.parse(data); //JSON 형식으로 변경
const mysql = require("mysql"); //mysql 라이브러리를 불러옴

// DB 연결 설정
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
  dateStrings: conf.dateStrings,
});
connection.connect(); //실제로 연결 실행

// -------------------------------------------------------------------------------------------- JWT 인증
app.post("/login", (req, res, next) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    const userDatabase = rows;

    const { email, password } = req.body;

    const userInfo = userDatabase.filter((item) => {
      return (item.email === email) & (item.password === password);
    })[0];

    if (!userInfo) {
      res.status(403).json("Not Authorized"); //로그인에 실패했을 때
    } else {
      try {
        // access Token 발급
        const accessToken = jwt.sign(
          {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "10m",
            issuer: "About Tech",
          }
        );

        // refresh Token 발급
        const refreshToken = jwt.sign(
          {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
          },
          process.env.REFRECH_SECRET,
          {
            expiresIn: "24h",
            issuer: "About Tech",
          }
        );

        // token 전송
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });

        res.status(200).json("login success");
      } catch (error) {
        res.status(500).json(error);
      }
    }
  });
});

// access Token 발급
app.get("/accesstoken", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    const userDatabase = rows;
    try {
      const token = req.cookies.accessToken; //accessToken값 가져와서 저장
      const data = jwt.verify(token, process.env.ACCESS_SECRET); //토큰 값을 확인
      const userData = userDatabase.filter((item) => {
        return item.email === data.email; //email값이 같은 것을 찾음
      })[0];

      const { password, ...others } = userData; //password는 숨겨야 하기 때문에 제외

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

// access Token 갱신
app.get("/refreshtoken", (req, res) => {
  // 용도: access token을 갱신.
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    const userDatabase = rows;
    try {
      const token = req.cookies.refreshToken;
      const data = jwt.verify(token, process.env.REFRECH_SECRET);
      const userData = userDatabase.filter((item) => {
        return item.email === data.email;
      })[0];

      // access Token 새로 발급
      const accessToken = jwt.sign(
        {
          id: userData.id,
          username: userData.username,
          email: userData.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "1m",
          issuer: "About Tech",
        }
      );

      //새로운 쿠키를 심어줌
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.status(200).json("Acces Token Recreated");
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

// 로그인이 성공했을 때
app.get("/login/success", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    const userDatabase = rows;
    try {
      const token = req.cookies.accessToken;
      const data = jwt.verify(token, process.env.ACCESS_SECRET);

      const userData = userDatabase.filter((item) => {
        return item.email === data.email;
      })[0];

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

// 로그아웃
app.post("/logout", (req, res) => {
  try {
    res.cookie("accessToken", ""); //accessToken을 비움
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json("error");
  }
});

// -------------------------------------------------------------------------------------------- 회원

// api/customers에 접속하면 쿼리문을 보냄, 그 결과를 사용자에게 보냄
app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
}); //api 명세

// post 메소드로 "/api/customers"에 접속을 한 경우 (회원 가입)
app.post("/api/customers", (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null,?, ?, ?, ?, ?, ?, now())";

  let userName = req.body.userName;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let gender = req.body.gender;
  let birthday = req.body.birthday;
  let params = [userName, name, email, password, gender, birthday];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    //console.log(`에러 내용 :${err}`); //오류가 나면 디버깅하는 방법
    // console.log(rows);
  });
});

// delete 메소드로 "/api/customers"에 접속을 한 경우 (회원 탈퇴)
app.delete("/api/customers/:id", (req, res) => {
  let sql = "DELETE FROM CUSTOMER WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// -------------------------------------------------------------------------------------------- 게시판

// 모든 게시글 가져오기 (최근 순)
app.get("/api/board", (req, res) => {
  let sql = "SELECT * FROM BOARD WHERE isDeleted = 0";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

// 모든 게시글 가져오기 (추천 순)
app.get("/api/recommend/board", (req, res) => {
  let sql = "SELECT * FROM BOARD WHERE isDeleted = 0 ORDER BY recommend , time";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

// post 메소드로 "/api/board"에 접속을 한 경우 (게시글 등록)
app.post("/api/board", (req, res) => {
  let sql = "INSERT INTO BOARD VALUES (null, ?, ?, ?, ?, now(), 0, 0, 0)";
  let userName = req.body.userName;
  let title = req.body.title;
  let content = req.body.content;
  let image = req.body.image;
  let params = [userName, title, content, image];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 특정 게시글 가져오기
app.get("/api/board/:id", (req, res) => {
  let sql = "SELECT * FROM BOARD WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

//delete 메소드로 "/api/board/:id"에 접속을 한 경우 (게시글 삭제)
app.delete("/api/board/:id", (req, res) => {
  let sql = "UPDATE BOARD SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

// 회원 탈퇴를 하면 해당 유저의 게시글도 삭제
app.delete("/api/customers/board/:username", (req, res) => {
  let sql = "UPDATE BOARD SET isDeleted = 1 WHERE username = ?";
  let params = [req.params.username];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

// 게시글 수정
app.put("/api/board/update/:id", (req, res) => {
  let sql = "UPDATE BOARD SET title = ?, content = ? WHERE id = ?";
  let params = [req.body.title, req.body.content, req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

// 댓글을 달았을 때 게시글 댓글 카운트 수정
app.put("/api/board/reply/update", (req, res) => {
  let sql = "UPDATE BOARD SET replyCount = ? WHERE id = ?";
  let params = [req.body.replyCount, req.body.boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

// -------------------------------------------------------------------------------------------- 북마크

// bookmark 가져오기 (select)
app.get("/api/bookmark", (req, res) => {
  let sql = "SELECT * FROM BOOKMARK ORDER BY time";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

// post 메소드로 "/api/bookmark"에 접속을 한 경우 (bookmark 정보 추가)
app.post("/api/bookmark", (req, res) => {
  let sql = "INSERT INTO BOOKMARK VALUES (?, ?, ?, ?, now())";
  let userId = req.body.userId;
  let boardId = req.body.boardId;
  let userName = req.body.userName;
  let title = req.body.title;
  let params = [userId, boardId, userName, title];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// bookmark 테이블 정보 수정
app.put("/api/bookmark/:id", (req, res) => {
  let sql = "UPDATE BOOKMARK SET title = ? WHERE boardId = ?";
  let params = [req.body.title, req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// bookmark 테이블에 정보 삭제
app.delete("/api/bookmark", (req, res) => {
  let sql = "DELETE FROM BOOKMARK WHERE userId = ? AND boardId = ?";
  let userId = req.body.userId;
  let boardId = req.body.boardId;
  let params = [userId, boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 게시물이 삭제됐을 때 bookmark 테이블에 정보 삭제
app.delete("/api/bookmark/board", (req, res) => {
  let sql = "DELETE FROM BOOKMARK WHERE boardId = ?";
  let boardId = req.body.boardId;
  let params = [boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//  회원 탈퇴했을 때 bookmark 테이블에 정보 삭제
app.delete("/api/bookmark/:userId", (req, res) => {
  let sql = "DELETE FROM BOOKMARK WHERE userId = ?";
  let userId = req.params.userId;
  let params = [userId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// -------------------------------------------------------------------------------------------- 게시글 추천

// recommendation 가져오기 (select)
app.get("/api/recommendation", (req, res) => {
  let sql = "SELECT * FROM RECOMMENDATION";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

// recommendation 테이블에 추천 정보 추가
app.post("/api/recommendation", (req, res) => {
  let sql = "INSERT INTO RECOMMENDATION VALUES (?, ?)";
  let userId = req.body.userId;
  let boardId = req.body.boardId;
  let params = [userId, boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

// 게시글 추천 수정
app.put("/api/board/update", (req, res) => {
  let sql = "UPDATE BOARD SET recommend = ? WHERE id = ?";
  let params = [req.body.recommend, req.body.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 추천을 취소했을 때 recommendation 테이블에 추천 정보 삭제
app.delete("/api/recommendation/down", (req, res) => {
  let sql = "DELETE FROM RECOMMENDATION WHERE userId = ? AND boardId = ?";
  let userId = req.body.userId;
  let boardId = req.body.boardId;
  let params = [userId, boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 게시물이 삭제됐을 때 recommendation 테이블에 추천 정보 삭제
app.delete("/api/recommendation/board", (req, res) => {
  let sql = "DELETE FROM RECOMMENDATION WHERE boardId = ?";
  let boardId = req.body.boardId;
  let params = [boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 회원 탈퇴했을 때 recommendation 테이블에 추천 정보 삭제
app.delete("/api/recommendation/:userId", (req, res) => {
  let sql = "DELETE FROM RECOMMENDATION WHERE userId = ?";
  let userId = req.params.userId;
  let params = [userId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// -------------------------------------------------------------------------------------------- 댓글

// 댓글 가져오기 (select)
app.get("/api/comment", (req, res) => {
  let sql = "SELECT * FROM COMMENT";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

// post 메소드로 "/api/comment/insert"에 접속을 한 경우 (댓글 등록)
app.post("/api/comment/insert", (req, res) => {
  let sql = "INSERT INTO COMMENT VALUES (null, ?, ?, ?, now(), 0, null, null, 0)";
  let boardId = req.body.boardId;
  let userName = req.body.userName;
  let comment = req.body.comment;
  let params = [boardId, userName, comment];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 대댓글을 달았을 때 댓글 수정
app.put("/api/comment/update/reply", (req, res) => {
  let sql = "UPDATE COMMENT SET reply = 1, replyCount = ? WHERE id = ?";
  let params = [req.body.replyCount, req.body.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// post 메소드로 "/api/comment/reply/insert"에 접속을 한 경우 (대댓글 등록)
app.post("/api/comment/reply/insert", (req, res) => {
  let sql = "INSERT INTO COMMENT VALUES (null, ?, ?, ?, now(), 0, ?, null, 0)";
  let boardId = req.body.boardId;
  let userName = req.body.userName;
  let reply = req.body.reply;
  let group = req.body.group;
  let params = [boardId, userName, reply, group];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 댓글 삭제
app.delete("/api/comment", (req, res) => {
  let sql = "DELETE FROM COMMENT WHERE id = ? AND boardId = ?";
  let id = req.body.id;
  let boardId = req.body.boardId;
  let params = [id, boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 게시물이 삭제됐을 때 댓글 삭제
app.delete("/api/comment/board", (req, res) => {
  let sql = "DELETE FROM COMMENT WHERE boardId = ?";
  let boardId = req.body.boardId;
  let params = [boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 회원 탈퇴했을 때 댓글 삭제
app.delete("/api/comment/:username", (req, res) => {
  let sql = "DELETE FROM COMMENT WHERE username = ?";
  let username = req.params.username;
  let params = [username];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// -------------------------------------------------------------------------------------------- 댓글 좋아요 기능

// 좋아요 정보 수정
app.put("/api/comment/update", (req, res) => {
  let sql = "UPDATE COMMENT SET up = ? WHERE id = ?";
  let params = [req.body.up, req.body.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 좋아요 정보 가져오기 (select)
app.get("/api/like", (req, res) => {
  let sql = "SELECT * FROM LIKES";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

// like 테이블에 좋아요 정보 추가
app.post("/api/like", (req, res) => {
  let sql = "INSERT INTO LIKES VALUES (?, ?, ?)";
  let userId = req.body.userId;
  let commentId = req.body.id;
  let boardId = req.body.boardId;
  let params = [userId, commentId, boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

// 좋아요를 취소했을 때 like 테이블에 좋아요 정보 삭제
app.delete("/api/like/down", (req, res) => {
  let sql = "DELETE FROM LIKES WHERE userId = ? AND commentId = ?";
  let userId = req.body.userId;
  let commentId = req.body.id;
  let params = [userId, commentId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 댓글이 삭제됐을 때 like 테이블에 좋아요 정보 삭제
app.delete("/api/like", (req, res) => {
  let sql = "DELETE FROM LIKES WHERE commentId = ?";
  let commentId = req.body.id;
  let params = [commentId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 게시물이 삭제됐을 때 like 테이블에 좋아요 정보 삭제
app.delete("/api/like/board", (req, res) => {
  let sql = "DELETE FROM LIKES WHERE boardId = ?";
  let boardId = req.body.boardId;
  let params = [boardId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 회원 탈퇴했을 때 like 테이블에 좋아요 정보 삭제
app.delete("/api/like/:userId", (req, res) => {
  let sql = "DELETE FROM LIKES WHERE userId = ?";
  let userId = req.params.userId;
  let params = [userId];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버 실행 여부를 console로 표현
