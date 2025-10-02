function PharmacyCard({ totalAsset }) {
  return (
    <div className="">
      <div className="bg-cyan-300 p-2 px-4 rounded ">
        <h4 className="font-semibold">TotalAmount: ${totalAsset}</h4>
      </div>
    </div>
  );
}

export default PharmacyCard;
