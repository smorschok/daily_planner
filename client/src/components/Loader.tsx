export const Loader:React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-info"
        style={{ width: "6rem", height: "6rem" }}
        role="status"
      ></div>
    </div>
  );
};
