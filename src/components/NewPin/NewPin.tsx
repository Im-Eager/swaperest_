import Router from "next/router";
import { FormEvent, useContext, useRef, useState } from "react";
import { SessionContext } from "../SessionContext";
import styles from "./newPin.module.css";

function isImage(url: string) {
    
    const extensions = ["jpg","jpeg","png","webp","avif","gif","svg"];

    for(const extension of extensions){
        if(url.includes(extension)){
            return true;
        }
    }

    return false;
  }

function NewPin() {

    const session = useContext(SessionContext);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const [imageUrl, setImageUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921");

    function loadImage(){

        if(!imageUrlRef.current){
            return;
        }
        
        const url = imageUrlRef.current.value;

        if(!isImage(url)){
            setImageUrl("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921");
        }else{
            setImageUrl(url);
        }
        
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!imageUrlRef.current || !titleRef.current){
            return;
        }

        const date = Date.now();
        const imageUrl = imageUrlRef.current.value;
        const title = titleRef.current.value;
        const code = [date, session._id].join(".");
        
        await fetch("https://swaperest-mindswap.vercel.app/api/pins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: imageUrl,
                title: title,
                author: session._id,
                date: date,
                likesCount: 0,
                dislikesCount: 0,
                comments: [] as string[],    
             })
        })


        const pinID = await fetch(`https://swaperest-mindswap.vercel.app/api/pins/pinbycode/${code}`).then(res => res.json());


        await fetch("https://swaperest-mindswap.vercel.app/api/users/", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                  pinId: pinID.id,
                  authorId: session._id
              })
         }).then(res => res.json);

         
         Router.push("https://swaperest-mindswap.vercel.app/")
        
    }



    return (
        <div className={styles.newPin}>
            <h2 className={styles.newPinDescription}>Please add your photo in the form below.</h2>
            <img className={styles.newPinImagePreview} src={imageUrl}/>

            <form className={styles.newPinForm} onSubmit={handleSubmit}>
                <label className={styles.newPinLabel}>
                    {" "}
                    Please paste you photo URL
                    <input className={styles.newPinUrlInput} type="url" name="photoUrl" required onChange={loadImage} ref={imageUrlRef}></input>
                </label>

                <label className={styles.newPinLabel}>
                    {" "}
                    Please add a title to your photo
                    <textarea className={styles.newPinTitleInput} name="title" required ref={titleRef}></textarea>
                </label>

                <button className={styles.newPinSubmitButton} type="submit">Submit</button>
            </form>
        </div>
    );
}

export { NewPin };
