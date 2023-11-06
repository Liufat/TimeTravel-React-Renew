import React from 'react';
function ProgressBar({ maxSteps, step, pageNames }) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className=" d-flex justify-content-center">
            <div className="progressbar-wrap col-lg-7 ">
              <ul className="progressbar">
                {Array(maxSteps)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <li key={i} className={i + 1 <= step ? 'active' : ''}>
                        <h2> {pageNames[i]}</h2>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
