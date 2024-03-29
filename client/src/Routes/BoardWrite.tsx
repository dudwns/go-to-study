import styled from "styled-components";
import ReactQuill from "react-quill"; //내용 작성을 위해 React-Quill 호출
import "react-quill/dist/quill.snow.css"; //React-Quill에서 사용될 스타일 CSS 파일까지 호출
import { useMemo, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms";
import { useNavigate } from "react-router-dom";

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const ImageBackground = styled.div`
  width: 100%;
  height: 30vh;
  background-image: url("/images/imgslider3.jpg");
  background-size: cover;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  background-color: ${(props) => props.theme.bgColor};
  & .quill {
    background-color: white;

    @media screen and (max-width: 700px) {
      width: 500px;
    }
    @media screen and (max-width: 550px) {
      width: 400px;
    }
  }
`;

const ReactQuillDiv = styled.div`
  background-color: white;
  height: 442px;

  @media screen and (max-width: 700px) {
    width: 500px;
    height: 466px;
  }
  @media screen and (max-width: 550px) {
    width: 400px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  width: 500px;
  padding: 5px 10px;

  @media screen and (max-width: 700px) {
    width: 400px;
    padding: 1px 3px;
  }

  @media screen and (max-width: 550px) {
    width: 300px;
    padding: 1px 3px;
  }
`;

const InsertBtn = styled.button`
  color: white;
  padding: 5px 10px;
  width: 60px;
  top: 10px;
  right: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.btnColor};
  border: 1px solid gray;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    font-size: 11px;
    width: 45px;
    padding: 3px 0;
  }
`;

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files) {
        var file: any = input.files[0];
        var formData = new FormData();

        formData.append("image", file);
        var fileName = file.name;
        try {
        } catch (error) {
          console.log("실패");
        }
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "link",
    "color",
    "background",
    "image",
  ];

  const InsertHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      url: "http://localhost:5000/api/board",
      method: "POST",
      withCredentials: true,
      data: {
        userName: user.username,
        title: title,
        content: content,
        image: "",
      },
    })
      .then((result) => {
        if (result.status === 200) {
          navigate("/board/1");
        }
      })
      .catch((error) => {
        alert("내용을 입력해주세요.");
      });
  };

  return (
    <>
      <ImageBackground></ImageBackground>
      <WrapperDiv>
        <Wrapper>
          <form onSubmit={InsertHandler}>
            <Header>
              <TitleInput
                type="text"
                placeholder="제목을 입력하세요. (최대 50자)"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "제목을 입력하세요. (최대 50자)")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                required
              ></TitleInput>
              <InsertBtn>등록</InsertBtn>
            </Header>
            <ReactQuillDiv>
              <ReactQuill
                className="quill"
                onChange={setContent}
                modules={modules}
                formats={formats}
                value={content}
                style={{ height: "400px" }}
                placeholder="내용을 입력하세요."
              ></ReactQuill>
            </ReactQuillDiv>
          </form>
        </Wrapper>
      </WrapperDiv>
    </>
  );
}

export default BoardWrite;
