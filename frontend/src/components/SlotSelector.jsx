import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SlotSelector = ({ docSlots, slotIndex, slotTime, setSlotTime }) => {
  const containerRef = useRef(null);

  // Auto-scroll to last item on load
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [docSlots, slotIndex]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center relative w-full mt-4">
      {/* Left Arrow */}
      <div className="flex mr-2">
        <button
          aria-label="Scroll left"
          className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-300 transition"
          onClick={scrollLeft}
        >
          <FaChevronLeft size={15} />
        </button>
      </div>

      {/* Slots */}
 <div className="overflow-x-hidden">
        <div
          ref={containerRef}
          className="flex items-center gap-3 w-full overflow-x-hidden snap-x snap-mandatory px-8 py-2 scrollbar-hide"
        >
          {docSlots[slotIndex]?.length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item?.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer snap-end ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {item.time === false ? "No slot available" : item?.time?.toLowerCase()}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No slots available</p>
          )}
        </div>
      </div>

      {/* Right Arrow */}
      <div className="flex ml-2">
        <button
          aria-label="Scroll right"
          className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-300 transition"
          onClick={scrollRight}
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default SlotSelector;
