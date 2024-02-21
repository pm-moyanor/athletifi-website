
import React from 'react';

const LatestMatch: React.FC = () => {
    return (
        <div className='bg-blue-950 h-56 flex flex-col justify-between p-4 relative w-1/2 rounded-10  text-primary'>
          <h1 className='text-lg font-semibold'>Latest Match</h1>
          <div className='flex flex-col w-1/2 absolute top-4 right-4 text-sm font-light'>
            <p className='text-right'>Saturday, 14 Mar 2021 . 01.00 am</p>
            <p className='text-right'>Citypark, St. Louis</p>
            <div className='flex items-end justify-end '> 
                <div className=' w-6 mr-2'>icon</div> 
                <p className='text-right'>68°F</p>
                </div>
          
          </div>
          <div className='flex justify-center'>
    
            <p className='p-2'>Chelsea</p>
            <img src="chelsea_logo.png" alt="Logo" className=''/>
            <p className='p-2'>0 - 2</p>
            <img src="liverpool_logo.png" alt="Logo" className='' />
            <p className='p-2'>Liverpool</p>
       
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col justify-center'>
            <h4 className=' text-center'>1</h4>
            <p className='text-xs font-light'>attacking</p>
            </div>
        
            <span className='h-4 w-1 bg-offwhite'/>
            <div className='flex flex-col justify-center'>
            <h4 className=' text-center'>1</h4>
            <p className='text-xs font-light'>attacking</p>
            </div>
            <span className='h-4 w-1 bg-offwhite'/>
            <div className='flex flex-col justify-center'>
            <h4 className=' text-center'>1</h4>
            <p className='text-xs font-light'>attacking</p>
            </div>
            <span className='h-4 w-1 bg-offwhite'/>
            <div className='flex flex-col justify-center'>
            <h4 className=' text-center'>1</h4>
            <p className='text-xs font-light'>attacking</p>
            </div>
            <span className='h-4 w-1 bg-offwhite'/>
            <div className='flex flex-col justify-center'>
            <h4 className=' text-center'>1</h4>
            <p className='text-xs font-light'>attacking</p>
            </div>
      
      
          </div>
        </div>
      );
};

export default LatestMatch;