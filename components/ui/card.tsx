export const Card = ({ children, ...props }: any) => <div {...props} className='bg-white shadow rounded p-4'>{children}</div>;
export const CardHeader = Card;
export const CardContent = Card;
export const CardFooter = Card;
export const CardTitle = ({ children }: any) => <h2 className='text-xl font-bold'>{children}</h2>;