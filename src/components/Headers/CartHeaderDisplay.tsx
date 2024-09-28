'use client'

import Link from 'next/link';
import React, { useEffect } from 'react'
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks';
import { useCart } from '@/hooks/queries';
import { cartActions } from '@/redux-store/store-slices/CartSlice';
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, NavbarItem, Image } from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./Icons";
// import Image from 'next/image';

const icons = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
  scale: <Scale className="text-warning" fill="currentColor" size={30} />,
  lock: <Lock className="text-success" fill="currentColor" size={30} />,
  activity: (
    <Activity className="text-secondary" fill="currentColor" size={30} />
  ),
  flash: <Flash className="text-primary" fill="currentColor" size={30} />,
  server: <Server className="text-success" fill="currentColor" size={30} />,
  user: <TagUser className="text-danger" fill="currentColor" size={30} />,
};

const CartHeaderDisplay = () => {
  const quantity = useAppSelector(state => state.cart.products.reduce((acc, product) => acc + product.quantity, 0))
  const cartItems = useAppSelector(state => state.cart.products)
  const dispatch = useAppDispatch()

  const { data, isLoading } = useCart()

  useEffect(() => {
    if (data) dispatch(cartActions.setCart({
      products: data.map(item => ({ ...item.product, quantity: item.quantity }))
    }))
  }, [data, dispatch])
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-[#3BB77E]"
            endContent={icons.chevron}
            radius="sm"
            variant="light"
          >
            <Badge
              content={isLoading && !data ? undefined : quantity.toString()}
              classNames={{
                badge: "bg-green-500 text-white",
                base: "gap-2",
              }}
            >
              <PiShoppingCartSimpleLight size={30} />
              <div className="hidden md:flex justify-center items-center space-x-2 cursor-pointer">
                <p className="text-sm">My cart</p>
                {/* <MdKeyboardArrowDown size={25} /> */}
              </div>
            </Badge>
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Cart"
        className="w-[340px]"
        itemClasses={{
          base: "gap-4",
          title: "font-medium",
          description: "font-medium",
        }}
      >
        <DropdownSection
          title={`Cart items: ${cartItems.length}`}
          items={cartItems.slice(0, 5)}
          showDivider
          classNames={{
            heading: "font-semibold text-black",
          }}
        >
          {(product) => (
            <DropdownItem
              key={product._id}
              href={`/product/${product._id}`}
              description={`Quantity: ${product.quantity}`}
              startContent={
                <Image
                  src={product.images[0]}
                  width={30}
                  height={30}
                  alt={product.name}
                  fallbackSrc="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              }
            >
              {product.name}
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            href="/cart"
            description="View cart"
            startContent={icons.lock}
          >
            View cart
          </DropdownItem>
        </DropdownSection>
        {/* <DropdownItem
          key="autoscaling"
          description="ACME scales apps to meet user demand, automagically, based on load."
          startContent={icons.scale}
        >
          Autoscaling
        </DropdownItem>
        <DropdownItem
          key="usage_metrics"
          description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
          startContent={icons.activity}
        >
          Usage Metrics
        </DropdownItem>
        <DropdownItem
          key="production_ready"
          description="ACME runs on ACME, join us and others serving requests at web scale."
          startContent={icons.flash}
        >
          Production Ready
        </DropdownItem>
        <DropdownItem
          key="99_uptime"
          description="Applications stay on the grid with high availability and high uptime guarantees."
          startContent={icons.server}
        >
          +99% Uptime
        </DropdownItem>
        <DropdownItem
          key="supreme_support"
          description="Overcome any challenge with a supporting team ready to respond."
          startContent={icons.user}
        >
          +Supreme Support
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CartHeaderDisplay