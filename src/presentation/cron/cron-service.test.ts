import { CronJob } from "cron";
import { CronService } from "./cron-service";

describe("CronService", () => {
  const mockTick = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("should create a job", (done) => {
    // Call mockTick once per second
    const job = CronService.createJob("* * * * * *", mockTick);

    expect(job).toBeInstanceOf(CronJob);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000); // 2 seconds have to call mockTick 2 times (1 per second)
  });
});
