import Image from 'next/image';

function RegisterMFA({
  qrSrc,
  qrKey,
  setQRState,
}: {
  qrSrc: string;
  qrKey: string;
  setQRState: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg mt-5">
        Scan the code below with an authenticator app
      </h1>
      <Image
        className="my-10"
        alt="QR-Code"
        src={qrSrc}
        width={200}
        height={200}
        quality={75}
        loading="lazy"
      />
      <p>{`Manual code: ${qrKey}`}</p>
      <div className="flex">
        <button
          className="m-3 p-3 bg-settingsGray text-black rounded-10 font-medium min-w-90"
          onClick={() => setQRState('off')}
        >
          Cancel
        </button>
        <button
          className="m-3 p-3 bg-skyblue text-black rounded-10 font-medium min-w-90"
          onClick={() => setQRState('verify-qr')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RegisterMFA;
