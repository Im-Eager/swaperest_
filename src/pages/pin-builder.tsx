import { GetServerSideProps } from "next/types";
import { NewPin } from "../components/NewPin/NewPin";
import { connectToDatabase } from "../../util/mongodb";
import { LoggedInHeader } from "../components/LoggedInHeader/LoggedInHeader"
import { Session } from "./index"

interface CreateNewPinProps{
    session: Session;
}

function CreateNewPin(props: CreateNewPinProps) {

    const { session } = props;

    return <>
        <LoggedInHeader avatar={session.avatar} username={session.username} />
        <NewPin session={session} />;
        </>
}

const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    const session=  await fetch("http://localhost:3000/api/session", {
            headers: {
                cookie: req.headers.cookie
            } as HeadersInit
        }).then(res => res.json() as Promise<Session>);
    return {
        props: {
            session: session,
        },
    };
}

export default CreateNewPin;
export { getServerSideProps };


