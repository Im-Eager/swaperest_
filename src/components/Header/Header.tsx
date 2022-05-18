import { useRouter } from 'next/router';

function Header() {

    const router = useRouter();

    return (
        <>
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="C:/Users/tiago/Desktop/Work/MindSwap2/FrontEnd/MyGitRepo/Mindarest/public/favicon16.png"
            />

            <header>
                <title>Mindarest</title>

                <div className="header_logo">
                    <img onClick={() => router.push(`http://localhost:3000`)} src="/logo.png" alt="logo" />
                </div>

                <input type="text" placeholder="Search"></input>

                <div className="header_notifications">
                    <img src="/notifications.png" />
                </div>

                <div className="header_user">
                    <img src="/user.png" />
                </div>
            </header>
        </>
    );
}

export { Header };
