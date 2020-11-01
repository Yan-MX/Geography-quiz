import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./images/pic.jpg";

export const GlobalStyle = createGlobalStyle`
html{
  height: 100%;

}
*{
  box-sizing:border-box;
  font-family:'Lobster',sans-serif;
}
body{
  background-image: url(${BGImage});
  background-size:cover;
  margin:0;
  padding: 0 20px;
  display:flex;
  justify-content:center;
  color: white;
  font-size:2vw;
}
`;
export const Wrapper = styled.div`
  width: 50vw;
  height: 50vw;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 2vw;
  padding: 4vw;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  > button {
    width: 10vw;
    font-size: 1.8vw;
    background-color: burlywood;
    border-radius: 10px;
    margin-top: 0.5vw;
  }
  > h1 {
    margin: 0;
    padding: 0;
  }
`;
