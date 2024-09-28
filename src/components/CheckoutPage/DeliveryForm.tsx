"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupProps, RadioProps } from "@nextui-org/react";
import CustomRadio from "../General/CustomRadio";
import { useAppSelector } from "@/redux-store/hooks";
import DeliveryListDropdown from "./DeliveryPreviewList";
import { Button } from "@nextui-org/react";

type FormData = {
  type:
    | "Express delivery"
    | "Batch delivery"
    | "Store pick up"
    | "Fulfilment Center pick up";
  deliveryAddress: string;
};

type Props = {
  isShopmate: boolean;
  vendorId?: string;
};

const radioGroupClassNames: RadioGroupProps['classNames'] = {
  wrapper: 'flex-nowrap flex-col md:flex-row'
}

const radioClassNames: RadioProps["classNames"] = {
  base: "w-full max-w-full flex-row justify-start items-start data-[selected=true]:border-green-500 hover:bg-content1",
  label: "font-semibold -mt-1",
  description: "flex-1 flex flex-col justify-between gap-4 text-black",
  labelWrapper: "gap-4 flex-1",
};

const DeliveryForm = ({ isShopmate, vendorId }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    type: "Express delivery",
    deliveryAddress: "",
  });

  const addressList = useAppSelector((state) => state.delivery.addressList);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!addressList[selectedAddressIndex]) return;

    if (
      formData.type === "Express delivery" ||
      formData.type === "Batch delivery"
    ) {
      const { houseNumber, streetAddress, city, state } =
        addressList[selectedAddressIndex];

      setFormData((prev) => ({
        ...prev,
        deliveryAddress: `${houseNumber} ${streetAddress} ${city} ${state}`,
      }));
    } else {
      setFormData((prev) => ({ ...prev, deliveryAddress: "" }));
    }
  }, [formData.type, addressList, selectedAddressIndex]);

  const isSelected = (type: typeof formData.type): boolean => {
    return formData.type === type;
  };

  const handleSelected = (type: string) => {
    setFormData((prev) => ({ ...prev, type: type as any }));
  };

  const hasAnEmptyField = (): boolean =>
    formData.type && formData.deliveryAddress ? false : true;

  const hasAddress = (): boolean => (formData.deliveryAddress ? true : false);

  const handleSubmit = () => {
    if (hasAnEmptyField()) return;

    localStorage.setItem("delivery details", JSON.stringify(formData));

    const searchParams = new URLSearchParams({
      step: "2",
      vendorId: vendorId || "",
      shopmate: isShopmate.toString(),
    });

    isShopmate
      ? router.push(`/checkout/shopmate?${searchParams.toString()}`)
      : router.push(`/checkout?${searchParams.toString()}`);
  };

  return (
    <section className="max-w-6xl flex flex-col gap-6 mx-auto p-4 w-full">
      <RadioGroup
        label={
          <div className="flex gap-4 rounded-2xl p-4 pr-8 bg-white shadow-sm">
            <span className="md:text-lg size-8 font-semibold flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-300">
              A
            </span>
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="md:text-lg font-semibold">
                A. Choose delivery option
              </h2>
              <hr />
            </div>
          </div>
        }
        value={formData.type}
        onValueChange={handleSelected}
        color="success"
        classNames={radioGroupClassNames}
      >
        <CustomRadio
          value={"Express delivery"}
          description={
            <>
              <p className="text-sm font-medium">
                Items in the cart are delivered to you immediately. an extra fee
                of N500 is paid for this option
              </p>
              {formData.type === "Express delivery" &&
              formData.deliveryAddress ? (
                <div className="flex items-baseline justify-between">
                  <p className="text-sm mt-[2.5px] max-w-[85%]">
                    <span>Address | </span>
                    {formData.deliveryAddress}
                  </p>
                  <DeliveryListDropdown
                    addressList={addressList}
                    selectedAddressIndex={selectedAddressIndex}
                    setSelectedAddressIndex={setSelectedAddressIndex}
                  />
                </div>
              ) : (
                <Button
                  className="text-sm p-3 px-8 bg-[#FEA610] text-white border border-[#FEA610] font-medium rounded-xl w-fit"
                  isDisabled={!isSelected("Express delivery")}
                  onPress={() =>
                    router.push("/account/profile/edit/delivery-address/add")
                  }
                >
                  Add your delivery address
                </Button>
              )}
            </>
          }
          classNames={radioClassNames}
        >
          Express delivery
        </CustomRadio>
        <CustomRadio
          value={"Batch delivery"}
          description={
            <>
              <p className="text-sm font-medium">
                Here items in the cart are delivered to you during the batch
                delivery hours. (Delivery time 12pm and 4pm)
              </p>
              {formData.type === "Batch delivery" &&
              formData.deliveryAddress ? (
                <div className="flex items-start justify-between">
                  <p className="text-sm max-w-[85%]">
                    <span>Address | </span>
                    {formData.deliveryAddress}
                  </p>
                  <DeliveryListDropdown
                    addressList={addressList}
                    selectedAddressIndex={selectedAddressIndex}
                    setSelectedAddressIndex={setSelectedAddressIndex}
                  />
                </div>
              ) : (
                <Button
                  className="text-sm p-3 px-8 bg-transparent text-[#FEA610] border border-[#FEA610] font-medium rounded-xl w-fit"
                  isDisabled={!isSelected("Batch delivery")}
                  onPress={() =>
                    router.push("/account/profile/edit/delivery-address/add")
                  }
                >
                  Add your delivery address
                </Button>
              )}
            </>
          }
          classNames={radioClassNames}
        >
          Batch delivery
        </CustomRadio>
      </RadioGroup>
      <RadioGroup
        label={
          <div className="flex gap-4 shadow-sm rounded-2xl p-4 pr-8 bg-white">
            <span className="md:text-lg size-8 font-semibold flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-300">
              B
            </span>
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="md:text-lg font-semibold">
                B. Choose Pick up option
              </h2>
              <hr />
            </div>
          </div>
        }
        value={formData.type}
        onValueChange={handleSelected}
        color="success"
        classNames={radioGroupClassNames}
      >
        <CustomRadio
          value={"Store pick up"}
          description={
            <>
              <p className="text-sm font-medium">
                Pick up Items in the cart at the purchase stores. they stores
                are listed below.
              </p>
              {/* Implement Store Pickup stations selections */}
            </>
          }
          classNames={radioClassNames}
        >
          Store pick up
        </CustomRadio>
        <CustomRadio
          value={"Fulfilment Center pick up"}
          description={
            <>
              <p className="text-sm font-medium">
                Pick up items in the cart at our fulfilment centres near you. A
                pick up fee of N200 is incurred.
              </p>
              <Button
                className="text-sm p-3 px-8 bg-transparent text-[#FEA610] border border-[#FEA610] font-medium rounded-xl w-fit"
                isDisabled={!isSelected("Fulfilment Center pick up")}
              >
                Select fulfilment centre near you
              </Button>
            </>
          }
          classNames={radioClassNames}
        >
          Fulfilment Center pick up
        </CustomRadio>
      </RadioGroup>
      <Button
        size="lg"
        isDisabled={!hasAddress()}
        className="p-4 max-w-2xl w-full bg-[#FEA610] text-white font-semibold rounded-2xl mx-auto"
        onPress={handleSubmit}
      >
        Continue
      </Button>
    </section>
  );
};

export default DeliveryForm;
