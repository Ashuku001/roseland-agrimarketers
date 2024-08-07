
function Banner() {
    return (
      <div className="flex flex-col lg:flex-row justify-between font-bold my-2">
          <div>
              <h1 className="text-5xl">Roseland Agrimarketer&apos;s Blog</h1>
              <h2 className="mt-5 md:mt-0">
                    Exploring {" "}
                  <span className="underline decoration-4 decoration-[#f4b400]">
                      adventures
                  </span>
                  {" "}
                  in agriculture
              </h2>
          </div>
      </div>
    )
  }
  
  export default Banner