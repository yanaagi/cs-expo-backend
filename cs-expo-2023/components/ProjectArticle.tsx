"use client";
import React, { useState, useEffect } from 'react';
import { AiOutlineRight, AiOutlineUp} from 'react-icons/ai';
import Image from "next/image";
import GallerySlider from "../components/ProjectArticleGallerySlider"



interface ProjectArticleProps {
  groupname: string | undefined;
  thesisTitle: string | undefined;
  abstract: string | undefined;
  summary: string | undefined;
  members: string[] | undefined;
  category: string | undefined;
  posterFilePath: string | undefined;
  AVPLink: string | undefined;
  groupPicturesCount: number[] | undefined;
  groupPicDir: string | undefined;
}

const ProjectArticle: React.FC<ProjectArticleProps> = ({
  groupname,
  thesisTitle,
  abstract,
  summary,
  members,
  category,
  posterFilePath,
  AVPLink,
  groupPicturesCount,
  groupPicDir
}) => {
  const [isReadMore, setReadMoreState] = useState(false);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);

  const toggleReadMore = () => {
    setReadMoreState(!isReadMore);
  };

  let galleryPaths:string[][]=[];

  // group picture paths
  for (let index = 0; index < (groupPicturesCount!==undefined?groupPicturesCount[0]:0); index++) {
    galleryPaths.push(["/group-images/"+groupPicDir+"/"+(index+1)+".jpg",""]);
  }
  // individual picture paths
  let tmp = (groupPicturesCount!==undefined?groupPicturesCount[0]+1:0); 
  for (let i = 1; i < (groupPicturesCount!==undefined?groupPicturesCount.length:0); i++) {
    for (let j = 0; j < (groupPicturesCount!==undefined?groupPicturesCount[i]:0); j++,tmp++) {
      galleryPaths.push(["/group-images/"+groupPicDir+"/"+(tmp)+".jpg",members!==undefined?members[i-1]:""]);
    }
  }

  return (
    <div className="flex flex-row  max-lg:flex-col max-md:flex-col max-sm:flex-col w-screen max-w-full">
      <div className="flex flex-col w-full pt-24">
        <div className="flex flex-col items-center justify-start pt-5">
          <div className="flex w-9/12 h-9/12 bg-timberwolf s-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <img src={posterFilePath} className=""></img>
            {/* <div className="absolute top-[30px] left-[-30px] h-[110px] w-[110px] rounded-full bg-yellow-300">

            </div>
            <div className="absolute top-[170px] left-[-30px] h-[110px] w-[110px] rounded-full bg-yellow-600">

            </div>
            <div className="absolute top-[80px] right-[-20px] bg-red-200 h-[250px] w-[250px] max-sm:h-[150px] max-sm:w-[150px]">
              
            </div> */}
          </div>
        </div>
        <div className="flex flex-col ml-5 mr-10 my-10">
          <div className="text-4xl max-sm:text-3xl font-bold text-end text-coral-pink pt-5">{groupname}</div>
          <div className="text-3xl max-sm:text-2xl font-bold text-end pt-3">{thesisTitle}</div>
        </div>
      </div>

      <div className="flex bg-timberwolf w-full pt-3">
        <div className="flex flex-col px-6">
          {/** */}
          <div className="flex flex-col">
            <div className="flex flex-row pt-4 sm:pt-2 md:pt-4 lg:pt-20 xl:pt-20"> 
              <div className="flex items-center justify-center max-h-none w-full mt-10">
                <div className="text-3xl font-bold">Abstract</div>
                <hr className="w-full h-px border-0 dark:bg-gray-700 ml-7"/>
              </div>
            </div>
            { isReadMore ? (
            <div id="abstract" className="max-h-none overflow-hidden text-xl">
                {abstract}
            </div>
            ): (
            <div id="abstract" className="max-h-20 overflow-hidden text-xl">
              {abstract}
            </div>
            )}
            <div className="flex flex-col">
              <div className="flex flex-row justify-end w-full bg-timberwolf pb-4 relative">
                {isReadMore?
                  (<></>):
                  (<div className="w-full h-[20px] bg-timberwolf opacity-90 absolute bottom-9"/>)}
                  
                <button onClick={toggleReadMore} className="flex items-center text-coral-pink font-bold cursor-pointer">
                  {isReadMore?(<>Read less</>):(<>Read more</>)}
                  <span className="ml-2">
                    {isReadMore?(<AiOutlineUp/>):(<AiOutlineRight/>)}
                  </span>
                </button>
              </div>
            </div>    
          </div>

          <div className="flex flex-col bg-timberwolf">
            <div className="flex flex-row py-5"> 
                <div className="flex items-center justify-center w-full">
                <div className="text-3xl font-bold">AVP</div>
                  <hr className="w-full h-px border-0 dark:bg-gray-700 ml-7"/>
                </div>
            </div>
            <div className="flex flex-row max-sm:flex-col h-full bg-timberwolf gap-10 max-sm:gap-2 mb-10 items-center justify-center">
              <div className="flex aspect-video bg-zinc-800 s-full w-10/12 h-10/12 text-timberwolf text-3xl font-bold justify-center items-center">
                <iframe src={AVPLink} width="100%" height="100%" allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-timberwolf">
            <div className="flex flex-row py-5"> 
                <div className="flex items-center justify-center w-full">
                <div className="text-3xl font-bold">Gallery</div>
                  <hr className="w-full h-px border-0 dark:bg-gray-700 ml-7"/>
                </div>
            </div>
            <div className="flex flex-col bg-timberwolf mb-10 ">
              <GallerySlider
                slides={galleryPaths}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProjectArticle;

