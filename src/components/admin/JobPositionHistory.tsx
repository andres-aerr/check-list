import React from "react";
import { JobPositionHistory } from "../../data/jobPositionsData";

interface JobPositionHistoryProps {
  history: JobPositionHistory[];
}

export const JobPositionHistoryView: React.FC<JobPositionHistoryProps> = ({
  history,
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-medium text-gray-900'>
        Historial de Cambios
      </h3>
      <div className='flow-root'>
        <ul role='list' className='-mb-8'>
          {history.map((entry, entryIdx) => (
            <li key={entry.id}>
              <div className='relative pb-8'>
                {entryIdx !== history.length - 1 ? (
                  <span
                    className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
                    aria-hidden='true'
                  />
                ) : null}
                <div className='relative flex space-x-3'>
                  <div>
                    <span className='h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white'>
                      <svg
                        className='h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </div>
                  <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                    <div>
                      <p className='text-sm text-gray-500'>
                        Cambio de puesto de trabajo
                        {entry.oldPosition ? (
                          <span>
                            {" "}
                            de{" "}
                            <span className='font-medium text-gray-900'>
                              {entry.oldPosition}
                            </span>
                          </span>
                        ) : null}
                        <span>
                          {" "}
                          a{" "}
                          <span className='font-medium text-gray-900'>
                            {entry.newPosition}
                          </span>
                        </span>
                      </p>
                      {entry.reason && (
                        <p className='mt-1 text-sm text-gray-500'>
                          Razón: {entry.reason}
                        </p>
                      )}
                    </div>
                    <div className='text-right text-sm whitespace-nowrap text-gray-500'>
                      <p>Por: {entry.changedBy}</p>
                      <time dateTime={entry.changedAt}>
                        {new Date(entry.changedAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
