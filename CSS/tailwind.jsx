
// Grid System & uses var

        <form className="grid grid-cols-6 gap-4 mb-5 text-[var(--textLight)]">
          <input
            className="col-span-3 p-2 border"
            type="text"
            placeholder="Enter Item"
          />
          <input
            className="col-span-2 p-2 border"
            type="text"
            placeholder="Enter $"
          />
          <button className="bg-gray-900 hover:bg-gray-950 p-2" type="submit">
            +
          </button>
        </form>
