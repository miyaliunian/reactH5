import styled from 'styled-components';

export const Content = styled.div`
    display:flex;
    flex:1;
    backgroundColor: 'orange'; 
    justifyContent: 'center',
    >span {
        display:flex;
    }
    >span >input  {
        border-right : 1px solid lightGray;
        border-top : 1px solid lightGray;
        box-shadow: 0;
        border-bottom : 1px solid lightGray;
    }
     >span : first-child  {
        border-left : 1px solid lightGray
    }
     >span : last-child  {
        border-right : 1px solid lightGray
    }
`