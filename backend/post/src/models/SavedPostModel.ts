import { DocumentType, getModelForClass, modelOptions, prop, ReturnModelType } from "@typegoose/typegoose";
import { IPost } from "../ts/interfaces/controllers.interfaces";
import { SavedPostType } from "../ts/types/app.types";
import { ErrorNotification } from "./ErrorNotification";


@modelOptions({schemaOptions:{collection:"saved_posts"}})
class SavedPost{
    
    @prop({type:String,required:true})
    username?:string;

    @prop({type:Array<SavedPostType>,required:true})
    savedPosts?:SavedPostType[]


    public static async assertSeeker(this:ReturnModelType<typeof SavedPost>,username:string){
        const seeker = await this.findOne({username})
        if(!seeker){
            await this.create({username,savedPosts:[]})
        }
    }

    public static async getSavedPosts(this:ReturnModelType<typeof SavedPost>,username:string){
        const seeker = await this.findOne({username})
        return seeker?.savedPosts;
    }

    public static async lookupSavedPostForSeeker(this:ReturnModelType<typeof SavedPost>,username:string,postId:string){
        const seeker = await this.findOne({username});
        const isFound = seeker!.savedPosts?.find(post => post.id === postId);
        if(isFound){
            return true;

        }else{
            return false;
        }
    }

    public async savePost(this:DocumentType<SavedPost>,post:SavedPostType){
        const postExists = this.savedPosts?.find(currentPost => currentPost.id === post.id);
        if(!postExists){
        this.savedPosts?.push(post);
        this.save();
        }
    }

    public async unsavePost(this:DocumentType<SavedPost>,postId:string){
        
        this.savedPosts = this.savedPosts?.filter(post => post.id !== postId);
        this.save();
        
    }
}


export const SavedPosts = getModelForClass(SavedPost);