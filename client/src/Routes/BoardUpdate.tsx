import styled from "styled-components";
import ReactQuill from "react-quill"; //내용 작성을 위해 React-Quill 호출
import "react-quill/dist/quill.snow.css"; //React-Quill에서 사용될 스타일 CSS 파일까지 호출
import { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding-top: 120px;
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

const UpdateBtn = styled.button`
  color: white;
  background-color: ${(props) => props.theme.btnColor};
  border: 1px solid gray;
  padding: 5px 10px;
  width: 60px;
  border-radius: 3px;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    font-size: 11px;
    width: 45px;
    padding: 3px 0;
  }
`;

function BoardUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/board/" + id,
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setTitle(result.data[0].title);
        setContent(result.data[0].content);
      }
    });
  }, []);

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

  const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      url: "http://localhost:5000/api/board/update/" + id,
      method: "PUT",
      withCredentials: true,
      data: {
        title: title,
        content: content,
        image: "",
      },
    })
      .then((result) => {
        if (result.status === 200) {
          axios({
            url: "http://localhost:5000/api/bookmark/" + id,
            method: "PUT",
            withCredentials: true,
            data: {
              title: title,
            },
          }).then((result) => {
            if (result.status === 200) {
              alert("수정되었습니다.");
              navigate(-1);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <Wrapper>
      <form onSubmit={updateHandler}>
        <Header>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TitleInput>{" "}
          <UpdateBtn>변경</UpdateBtn>
        </Header>
        <ReactQuillDiv>
          <ReactQuill
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
  );
}
export default BoardUpdate;
