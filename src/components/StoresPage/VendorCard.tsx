import Link from 'next/link';
import React from 'react'
import ServerImageRender from '../General/ServerImageRender';
import { Vendor } from '@/lib/types';

type PropsType = {
  store: Vendor
}

const VendorCard = ({ store }: PropsType) => {
  return (
    <Link
      href={`/store/${store._id}`}
      className="text-center w-full max-w-[300px]"
    >
      <div className="w-full">
        {store.logo ? (
          <ServerImageRender
            folderName="vendor"
            src={store.logo}
            alt={store.name}
            width={300}
            height={300}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 rounded-lg shadow-lg" />
        )}
        <div className="mt-2">
          <h3 className="text-sm md:text-lg font-semibold line-clamp-1">
            {store.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default VendorCard