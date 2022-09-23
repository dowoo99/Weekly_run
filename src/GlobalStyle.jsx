import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 html{
   font-size: 62.5%; //1 rem =10px

 }
 body{
  /* background-color: blue; */
  font-size: 1.6rem;
  margin: 0;
  padding: 0;
  font-family: "Noto Sans CJK KR";
 }
::-webkit-scrollbar {
	display:none /* Chrome , Safari , Opera */
}

@media only screen  and (max-width:880px){
  body{
    background-color: white;
  }
}




`;

export default GlobalStyle;
