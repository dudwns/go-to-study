const fs = require("fs"); //파일에 접근할 수 있는 라이브러리를 불러옴
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { login, accessToken, refreshToken, loginSuccess, logout } = require("./controller");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const data = fs.readFileSync("./database.json"); //datatase.json 파일을 읽어옴
const conf = JSON.parse(data); //JSON 형식으로 변경
const mysql = require("mysql"); //mysql 라이브러리를 불러옴

app.post("/login", login);
app.get("/accesstoken", accessToken);
app.get("/refreshtoken", refreshToken);
app.get("/login/success", loginSuccess);
app.post("/logout", logout);

//연결 설정
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect(); //실제로 연결 실행

// api/customers에 접속하면 쿼리문을 보냄, 그 결과를 사용자에게 보냄
app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER WHERE isDeleted = 0", (err, rows, fields) => {
    res.send(rows);
  });
}); //api 명세

//post 메소드로 "/api/customers"에 접속을 한 경우 (insert)
app.post("/api/customers", (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";

  let id = req.body.id;
  let password = req.body.password;
  let name = req.body.name;
  let gender = req.body.gender;
  let birthday = req.body.birthday;
  let params = [id, password, name, gender, birthday];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    //console.log(`에러 내용 :${err}`); //오류가 나면 디버깅하는 방법
    // console.log(rows);
  });
});

//delete 메소드로 "/api/customers"에 접속을 한 경우 (delete)
app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //서버 실행 여부를 console로 표현
