'use server';

import React from 'react';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

const SignOut = async () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="flex items-center  justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ">
        <PowerIcon className="w-6 font-bold text-white" />
        <p className="sm:hidden">Exit</p>
      </button>
    </form>
  );
};

export default SignOut;
