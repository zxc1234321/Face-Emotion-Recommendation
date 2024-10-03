import styled from 'styled-components';

const Login = () => {
    return (
        <Login_Container>
            <Login_Wrapper>
                <Login_Title>로그인</Login_Title>
                <SignUp_Btn>아직 회원이 아니신가요?
                    <a href="/sign_up">회원가입</a>
                </SignUp_Btn>
                <Login_Form action="">
                    <Label>아이디</Label>
                    <input type="text" />
                    <Label>비밀번호</Label>
                    <input type="password" /><br />
                    <input type="submit" value="로그인" />
                </Login_Form>
            </Login_Wrapper>
        </Login_Container>
    );
};

const Login_Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    padding: 0 20px;
`;

const Login_Wrapper = styled.div`
    width: 100%;
    max-width: 350px;
    padding: 30px;
    border: 1px solid #f9f9f9;
    border-radius: 15px;
    background-color: #f9f9f9;
    box-shadow: 2.5px 2.5px 12.5px 2.5px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

const Login_Title = styled.p`
    font-size: 28px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 16px;
    text-align: center;
`;

const SignUp_Btn = styled.p`
    font-size: 16px;
    text-align: center;

    a {
        text-decoration: underline;
        color: #000;

        &:hover {
            font-weight: bold;
        }
    }
`;

const Login_Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;

    input[type="text"],
    input[type="password"],
    input[type="submit"] {
        padding: 0 18px;
        width: 100%;
        height: 42px;
        border-radius: 25px;
        border: 1px solid #999;
        box-sizing: border-box;
        font-size: 14px;
    }

    input[type="submit"] {
        background-color: #999;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            border: none;
            background-color: #000000;
        }
    }
`;

const Label = styled.p`
    margin-bottom: 4px;
    font-weight: bold;
`;

export default Login;
