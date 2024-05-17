
const TableHeader = () => {
    return (
        <thead className="bg-primary text-slate-700 py-3 text-lg font-medium">
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Sending date</th>
                <th>Sender name</th>
                <th>View task</th>
                <th>status</th>
              </tr>
            </thead>
    );
};

export default TableHeader;