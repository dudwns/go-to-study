import styled from "styled-components";
import ReactQuill from "react-quill"; //내용 작성을 위해 React-Quill 호출
import "react-quill/dist/quill.snow.css"; //React-Quill에서 사용될 스타일 CSS 파일까지 호출
import { useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding-top: 120px;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  width: 500px;
`;

const UpdateBtn = styled.button`
  border: none;
  padding: 5px 10px;
  width: 60px;
  cursor: pointer;
`;

function BoardUpdate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/board/" + id,
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setTitle(result.data[0].title);
        console.log(result.data[0].content);
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
    console.log(title, content);
    axios({
      url: "http://localhost:5000/board/update/" + id,
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
          alert("수정되었습니다.");
          window.open("/", "_self");
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
        <ReactQuill
          onChange={setContent}
          modules={modules}
          formats={formats}
          value={content}
          style={{ height: "400px" }}
          placeholder="내용을 입력해주세요."
        ></ReactQuill>
      </form>
    </Wrapper>
  );
}
export default BoardUpdate;
