import Head from "next/head";

function Header() {
    function loginRegister() {
        return (
            <div className="login-register">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        );
    }

    return (
        <>
            <Head>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon16.png" />
            </Head>
            <header>
                <title>Mindarest</title>

                <div className="header_logo">
                    <img src="/logo.png" alt="logo" />
                </div>

                <input type="text" placeholder="🔎 Search"></input>

                <div className="header_notifications">
                    <img src="/notifications.png" />
                </div>

                <div className="header_user">
                    <img onClick={loginRegister} src="/user.png" />
                </div>
            </header>
        </>
    );
}

export { Header };
