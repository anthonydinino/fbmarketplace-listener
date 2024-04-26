const Variance = ({ variance, setVariance }) => {
  return (
    <div className="flex flex-col border-2 p-3">
      <div
        className="tooltip tooltip-bottom"
        data-tip="Randomly add or subtract seconds from the refresh rate for each listener"
      >
        <label className="text-center font-bold">Variance</label>
      </div>
      <p className="mx-auto">
        {`${variance < 1 ? "" : "0 - "}${variance} second${
          variance == 1 ? "" : "s"
        }`}
      </p>
      <input
        defaultValue={0}
        onChange={(e) => setVariance(e.target.value)}
        type="range"
        min={0}
        max="20"
        className="range min-w-40"
        step="1"
      />
    </div>
  );
};

export default Variance;
