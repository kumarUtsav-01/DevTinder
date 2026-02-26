// @ts-nocheck
const UserCard = ({ user, userAction = null }) => {
  const { _id, photoUrl, age, gender, firstName, lastName, about } = user;

  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure>
        <img src={photoUrl} alt='photo' />
      </figure>
      <div className='card-body justify-end'>
        <h2 className='card-title'>{`${firstName} ${lastName}`}</h2>
        {!isNaN(age) && gender && (
          <p className='flex-none'>{`${age}, ${gender}`}</p>
        )}
        <p className='flex-none'>{about}</p>
        <div className='card-actions justify-around'>
          <button
            className='btn btn-circle btn-primary'
            onClick={() => userAction(_id, "ignored")}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='currentColor'
              className='size-[1.2em]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 6l12 12M18 6L6 18'
              />
            </svg>
          </button>
          <button
            className='btn btn-circle btn-secondary'
            onClick={() => userAction(_id, "interested")}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='currentColor'
              className='size-[1.2em]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
