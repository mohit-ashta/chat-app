import React from 'react'
import { IoAdd, IoFilter, IoSearch } from 'react-icons/io5'

const TopFilter = () => {
  return (
    <div className="p-3 flex flex-col gap-3">
    <div className="flex justify-between text-black ">
      <h2>Chats</h2>
      <div className="flex justify-between gap-3">
        <h5 className="flex items-center cursor-pointer gap-2">
          <IoAdd /> New
        </h5>
        <h5 className="flex items-center cursor-pointer gap-2">
          <IoFilter /> Archeive
        </h5>
      </div>
    </div>
    <div className="border flex bg-greyish rounded-s-full rounded-e-full p-2 items-center ">
      <IoSearch size={22} />
      <input
        type="search"
        className="bg-transparent px-2 focus:outline-none"
        placeholder="search contact /chat"
      />
    </div>
  </div>
  )
}

export default TopFilter