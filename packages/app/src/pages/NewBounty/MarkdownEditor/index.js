import React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { StyledTextArea } from './Wrapper'
import Title from "@components/Title";
import { useDispatch, useSelector } from "react-redux";
import { newBountyContentSelector, setNewBountyContent } from "../../../store/reducers/newBountySlice";
import Markdown from "@components/Markdown";
import { detailErrorSelector, setNewBountyDetailError } from "@store/reducers/newBountySlice";
import ErrorLine from "@components/ErrorLine";

export default function MarkdownEditor() {
  const dispatch = useDispatch()

  const content = useSelector(newBountyContentSelector)
  const setContent = (content) => {
    dispatch(setNewBountyDetailError(null))
    dispatch(setNewBountyContent(content))
  }
  const [selectedTab, setSelectedTab] = React.useState("write");

  const detailError = useSelector(detailErrorSelector)

  return (
    <StyledTextArea color="#04D2C5">
      <Title>Detail</Title>
      <ReactMde
        generateMarkdownPreview={markdown => Promise.resolve(<Markdown isPreview={true} md={markdown} />)}
        value={content}
        onChange={setContent}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        minEditorHeight={400}
        toolbarCommands={[['bold', 'header', 'link', 'quote', 'strikethrough',
          'code', 'image', 'ordered-list', 'unordered-list']]}
      />

      {
        detailError && <ErrorLine>{detailError}</ErrorLine>
      }
    </StyledTextArea>
  )
}
