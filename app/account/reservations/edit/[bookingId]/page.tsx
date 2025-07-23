import SubmitButton from '@/app/_components/SubmitButton';
import { updateBooking } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';

type Props = {
  params: Promise<{ bookingId: string }>;
};

const Page = async ({ params }: Props) => {
  const { bookingId } = await params;
  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Page;
