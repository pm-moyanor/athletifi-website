export default function Notifications() {
  return (
    <div className="flex flex-col mt-16 text-white">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4">
        Notifications
      </h2>
      <div className="text-offwhite mx-4 my-8">
        What would you like to be notified via email?
      </div>
      <div className="rounded bg-cardsDark">
        <div className="flex justify-between items-center py-4 mx-4">
          <div>Referral notifications</div>
          <div className="flex items-center cursor-pointer">
            <div className="toggle-scale">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 mx-4 border-t border-t-offwhite">
          <div>AthletiFi Updates</div>
          <div className="flex items-center cursor-pointer">
            <div className="toggle-scale">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 mx-4 border-t border-t-offwhite">
          <div>General Highlights</div>
          <div className="flex items-center cursor-pointer">
            <div className="toggle-scale">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 mx-4 border-t border-t-offwhite">
          <div>My Player Updates</div>
          <div className="flex items-center cursor-pointer">
            <div className="toggle-scale">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
