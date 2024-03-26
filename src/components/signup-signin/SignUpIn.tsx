'use client';
import React, { useState } from 'react';

interface SignupProps {
  isSignupPage: boolean;
}

const SignUpIn: React.FC<SignupProps> = ({ isSignupPage }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  //need to add the functionality
  const handleSignUp = () => {
    console.log(email, password);
  };

  return (
    <div className=" flex justify-center h-auto items-center py-[50px]">
      <div className="bg-cardsDark rounded-md h-auto md:h-[690px] font-sourceSansPro w-full max-w-[540px] px-6 md:px-12 py-10 flex flex-col items-center justify-around mt-20 mx-4">
        <div className="flex w-full justify-between flex-col-reverse md:flex-row">
          <div className="text-base md:text-[20px]">
            <h4 className="text-primary font-extralight mt-4 md:mt-0">
              Welcome to{' '}
              <a href="/" className="text-skyblue">
                AthletiFi
              </a>
            </h4>
            <h2 className="text-primary text-[45px] md:text-[55px] -mt-2 md:mt-2 font-semibold">
              {isSignupPage ? 'Sign up' : 'Sign in'}
            </h2>
          </div>

          <div className="flex-flex-col text-sm">
            {isSignupPage ? (
              <>
                <p className="text-primary font-extralight">Have an Account?</p>
                <a href="/login" className="text-skyblue">
                  Sign in
                </a>
              </>
            ) : (
              <>
                <p className="text-primary font-extralight">
                  Don{"'"}t have an Account?
                </p>
                <a href="/register" className="text-skyblue">
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
        <div className="h-px bg-partnersBorders w-full my-4" />
        <form className="flex flex-col w-full h-[450px] items-end justify-around text-primary">
          <div className="flex flex-col w-full">
            <label className="mb-2 font-thin">Enter your email address</label>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[53px] bg-cardsBackground rounded-lg pl-3 font-extralight text-sm"
            />
          </div>
          <div
            className={`flex flex-col w-full ${!isSignupPage ? '-mt-10' : 'mt-0'}`}
          >
            <label className="mb-2 font-thin">Enter your password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[53px] bg-cardsBackground rounded-lg pl-3 font-extralight text-sm"
            />
            {!isSignupPage && (
              // need to add the logic to recover password
              <p className="opacity-50 font-extralight mt-[4px] pr-2 w-full text-right">
                Forgot your password?
              </p>
            )}
          </div>
          {isSignupPage && (
            <div className="flex flex-col my-3 w-full">
              <label className="text-primary mb-2 font-thin">
                Confirm your password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[53px] bg-cardsBackground rounded-lg pl-3 font-extralight mb-12 text-sm"
              />
            </div>
          )}

          <button
            onClick={handleSignUp}
            className="w-[200px] md:w-[230px] h-[43px] md:h-[53px] rounded-full bg-darkerSkyBlue shadow-md shadow-lime-500/20 text-darkgray"
          >
            {isSignupPage ? 'Sign up' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpIn;
