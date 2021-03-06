import React, { useState } from 'react';
import { MainNavBackground, AmberText } from './PrimaryHeader';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import tw from 'twin.macro';

const PublishButton = tw.button`
  text-white
  bg-green-600
  hover:bg-green-700
  disabled:(cursor-not-allowed opacity-50)
  disabled:hover:bg-green-600
  font-bold
  p-2
  font-sans
  border-none
  outline-none
  rounded
  flex
  flex-row
  items-center
  mx-2
`;

/**
 * The header to be used on pages where a user can compose something a walking tour or article.
 * @param heading the heading for this composer page. I.e. "Article Composer"
 * @param publishEnabled whether or not the publish button should be enabled or not
 */
const ComposerHeader = ({heading, publishEnabled = false}: {
  heading: string,
  publishEnabled?: boolean
}) => {
  const [published, setPublished] = useState(false);

  return (
    <MainNavBackground>
      <div tw="flex flex-row content-between w-full">
        <div tw="flex flex-row items-center">
          {AmberText}
          <ArrowForwardIosIcon />
          <h3 tw="ml-2">{heading}</h3>
        </div>
        <div tw="flex-auto"></div>
        <div tw="flex flex-row items-center">
          <div>Status: {published ? "Published" : "Not Published"}</div>
          <PublishButton onClick={() => setPublished(true)} disabled={!publishEnabled || published}>
            <CloudUploadIcon />
            <div tw="ml-1">Publish</div>
          </PublishButton>
        </div>
      </div>
    </MainNavBackground>
  );
}

export default ComposerHeader;