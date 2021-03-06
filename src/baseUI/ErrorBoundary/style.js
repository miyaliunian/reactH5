import styled, { keyframes } from "styled-components";

const move = keyframes`
    0% {
        transform: translate(-50%, -5px);
}
    100% {
        transform: translate(-50%, 0);
}
`;

export const NoMatchWrapper = styled.div`
  position: fixed;
  top: 60px;
  bottom: 0px;
  background-color: #ffffff;
  padding-top: 1.767rem;
  width: 100%;
  .img-wrapper {
    width: 70%;
    margin: 0 auto;
    position: relative;
    padding-top: 48%;
    .bg {
      width: 77.724%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
    }
    .panfish {
      width: 20.994%;
      position: absolute;
      left: 50%;
      top: 46%;
      transform: translate(-50%, 0);
      animation: ${move} 2s ease-in-out infinite alternate;
    }
    .sea {
      width: 99.199%;
      opacity: 0.7;
      position: absolute;
      left: 50%;
      top: 62%;
      transform: translateX(-50%);
    }
    .spray {
      width: 40.545%;
      opacity: 0.4;
      position: absolute;
      left: 50%;
      top: 62%;
      transform: translateX(-50%);
    }
  }
  .link-wrapper {
    margin-top: 2rem;
    text-align: center;
    .link {
      background-color: #007fff;
      color: #ffffff;
      border-radius: 5px;
      display: inline-block;
      padding: 0.625rem 4rem;
      font-size: 1.5rem;
    }
  }
`;
