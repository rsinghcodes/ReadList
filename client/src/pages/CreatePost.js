import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Heading } from "../components/Typography";
import Button from "../components/controls/Button";

const CreatePost = () => {
  const [addData, setAddData] = useState("");
  const [data, setData] = useState(0);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setAddData(data);
  };

  return (
    <div>
      <Heading textTransform="uppercase">Write something to publish.</Heading>
      <CKEditor editor={ClassicEditor} data={addData} onChange={handleChange} />
      <Button onClick={() => setData(!data)}>Show Data</Button>
      <div>{data ? addData : ""}</div>
    </div>
  );
};

export default CreatePost;
