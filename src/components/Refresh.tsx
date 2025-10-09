"use client";
const Refresh = ({ title }: { title: string }) => {
  const HandleRefresh = () => {
    window.location.reload();
  };
  return <span onClick={HandleRefresh}>{title}</span>;
};

export default Refresh;
