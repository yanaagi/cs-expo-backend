import React from 'react';

interface PartnersLayoutProps {
  partner: {
    Web: string;
    facebook: string;
    twitter: string;
    instagram: string;
    intro: string;
    imagePath?: string; // Add imagePath as an optional property
  };
}

const PartnersLeftLayout: React.FC<PartnersLayoutProps> = ({ partner }) => {
  const backgroundImageStyle = partner.imagePath
    ? { backgroundImage: `url(${partner.imagePath})`, backgroundSize: 'cover' }
    : undefined;

  return (
    <div className="flex items-center p-12">
      {partner.imagePath && (
        <div
          className="flex-shrink-0 w-48 h-48 bg-blue-500 s-full"
          style={backgroundImageStyle}
        />
      )}
      <div className="flex flex-col items-center ml-2">
        <a href={partner.Web} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 my-2 grid place-items-center">
          <img src="/web.svg" className="w-7 h-7 mx-auto"/>
        </a>
        <a href={partner.facebook} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 grid place-items-center"> 
          <img src="/facebook.svg" className="w-7 h-7"/>
        </a>
        <a href={partner.twitter} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 grid place-items-center">
          <img src="/twitter-x.svg" className="w-7 h-7"/>
        </a>
        <a href={partner.instagram} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 grid place-items-center">
          <img src="/instagram.svg" className="w-7 h-7"/>
        </a>
      </div>
      <div className="font-regular ml-10 text-2xl">{partner.intro}</div>
    </div>
  );
};

const PartnersRightLayout: React.FC<PartnersLayoutProps> = ({ partner }) => {
  const backgroundImageStyle = partner.imagePath
    ? { backgroundImage: `url(${partner.imagePath})`, backgroundSize: 'cover' }
    : undefined;

  return (
    <div className="flex items-center justify-end p-12">
      <div className="font-regular mr-10 text-2xl">{partner.intro}</div>
      <div className="flex flex-col items-center mr-2">
        <a href={partner.Web} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 my-2 grid place-items-center">
          <img src="/web.svg" className="w-7 h-7 mx-auto"/>
        </a>
        <a href={partner.facebook} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 grid place-items-center">
          <img src="/facebook.svg" className="w-7 h-7"/>
        </a>
        <a href={partner.twitter} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 grid place-items-center">
          <img src="/twitter-x.svg" className="w-7 h-7"/>
        </a>
        <a href={partner.instagram} target="_blank" className="w-10 h-10 bg-coral-pink rounded-full mb-2 grid place-items-center">
          <img src="/instagram.svg" className="w-7 h-7"/>
        </a>
      </div>
      {partner.imagePath && (
        <div
          className="flex-shrink-0 w-48 h-48 bg-blue-500 s-full"
          style={backgroundImageStyle}
        />
      )}
    </div>
  );
};

interface AlternatingPartnersLayoutProps {
  partners: Array<any>; // Adjust the type if needed
}

const AlternatingPartnersLayout: React.FC<AlternatingPartnersLayoutProps> = ({ partners }) => {
  const alternatingPartners = [];

  for (let i = 0; i < partners.length; i++) {
    if (((i+1)%2)==1) {
      alternatingPartners.push(
        <PartnersLeftLayout key={i} partner={partners[i]} />
      );
    }
    else {
      alternatingPartners.push(
        <PartnersRightLayout key={i} partner={partners[i]} />
      );
    }
  }

  return <>{alternatingPartners}</>;
};

export default AlternatingPartnersLayout;
