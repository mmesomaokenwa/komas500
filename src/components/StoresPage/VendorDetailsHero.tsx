import React from 'react'
import LocationSelector from '../HomePage/LocationSelector';
import ServerImageRender from '../General/ServerImageRender';
import VendorLogo from './VendorLogo';

type PropsType = {
  query?: string
  category?: string
  logo: string
}

const VendorDetailsHero = ({ query, category, logo}: PropsType) => {
  return (
    <section className="mt-4 w-full h-full">
      <LocationSelector />
      <div className="flex space-x-4 mb-4 relative overflow-hidden">
        <VendorLogo
          logo={logo}
          query={query}
          category={category}
        />
        <div className="hidden md:inline-block my-auto">
          <ServerImageRender
            folderName="vendor"
            src={logo}
            alt="food"
            width={250}
            height={250}
            className="my-auto size-[250px] rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default VendorDetailsHero