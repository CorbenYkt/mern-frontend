import React from 'react';
import { FaClock } from "react-icons/fa6";

export const UserInfo = ({ avatar, fullName, additionalText }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={avatar}
        alt={fullName}
        className="w-12 h-12 rounded-full object-cover border border-gray-300"
      />
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <span>{fullName}</span>
        <div className="flex items-center space-x-1">
          <FaClock />
          <span>{additionalText}</span>
        </div>
      </div>
    </div>

  );
};
