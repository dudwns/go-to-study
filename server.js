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
      return item.email === email;
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

// connection.query("SELECT * FROM CUSTOMER WHERE isDeleted = 0", (error, rows) => {
//   console.log(`에러 내용: ${error}`);
//   console.log(rows);
// });

//post 메소드로 "/api/customers"에 접속을 한 경우 (insert)
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

//delete 메소드로 "/api/customers"에 접속을 한 경우 (회원탈퇴)
app.delete("/api/customers/:id", (req, res) => {
  let sql = "DELETE FROM CUSTOMER WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// -------------------------------------------------------------------------------------------- 게시판
app.get("/api/board", (req, res) => {
  let sql = "SELECT * FROM BOARD WHERE isDeleted = 0";
  connection.query(sql, (err, rows, fileds) => {
    res.send(rows);
  });
});

//post 메소드로 "/api/board"에 접속을 한 경우 (insert)
app.post("/api/board", (req, res) => {
  let sql = "INSERT INTO BOARD VALUES (null, ?, ?, ?, ?, now(), 0, 0)";
  let userName = req.body.userName;
  let title = req.body.title;
  let content = req.body.content;
  let image = req.body.image;
  let params = [userName, title, content, image];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

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

app.put("/board/update/:id", (req, res) => {
  let sql = "UPDATE BOARD SET title = ?, content = ? WHERE id = ?";
  let params = [req.body.title, req.body.content, req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버 실행 여부를 console로 표현
