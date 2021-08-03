import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Button, Input } from "@chakra-ui/react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm, Form } from "../util/useForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [addData, setAddData] = useState("");
  const [data, setData] = useState(0);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setAddData(data);
  };

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Box my="10">
          <Input
            placeholder="Write title here..."
            name="body"
            value={values.body}
            onChange={onChange}
          />
        </Box>
        <Box my="10">
          <CKEditor
            editor={ClassicEditor}
            data={addData}
            onChange={handleChange}
          />
        </Box>

        <Button type="submit">Submit</Button>
      </Form>
      {error && (
        <div style={{ marginBottom: 20 }}>
          <ul>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
