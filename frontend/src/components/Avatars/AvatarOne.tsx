import React from 'react';

import userOne from '../../images/user/user-03.png';

interface Avatar {
  image: string;
  classes: string;
}

const avatarItems: Avatar[] = [
  {
    image: userOne,
    classes: 'max-w-6 h-6',
  },
  {
    image: userOne,
    classes: 'max-w-9.5 h-9.5',
  },
  {
    image: userOne,
    classes: 'max-w-13 h-13',
  },
  {
    image: userOne,
    classes: 'max-w-20 h-20',
  },
];

const AvatarOne: React.FC = () => {
  return (
    <div className="flex items-center gap-6">
      {avatarItems.map((item, index) => (
        <div key={index} className={`w-full rounded-full ${item.classes}`}>
          <img src={item.image} alt="user" />
        </div>
      ))}
    </div>
  );
};

export default AvatarOne;
