import "./Performence.css";

const MockupDashPerformence = () => {
  return (
    <div className="container">
      <div className="skill-box">
        <span className="title">Total Project</span>

        <div className="skill-bar">
          <span className="skill-per html">
            <span className="tooltip">50%</span>
          </span>
        </div>

        <div className="skill-box">
          <span className="title">Complete Project</span>

          <div className="skill-bar">
            <span className="skill-per css">
              <span className="tooltip">70%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">Reject Project</span>

          <div className="skill-bar">
            <span className="skill-per javascript">
              <span className="tooltip">50%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">Working Employee</span>

          <div className="skill-bar">
            <span className="skill-per nodejs">
              <span className="tooltip">30%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockupDashPerformence;
