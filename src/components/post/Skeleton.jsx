import React from "react";

export const PostSkeleton = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-4">
      <div className="w-full h-72 bg-gray-200 animate-pulse rounded-md"></div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="space-y-2">
            <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-24 h-3 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-4/5 h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="flex space-x-2">
            <div className="w-10 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-10 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-10 h-6 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
