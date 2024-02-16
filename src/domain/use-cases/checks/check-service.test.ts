import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('CheckService UseCase', () => {

    beforeEach(() => jest.clearAllMocks())

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(mockRepository, successCallback, errorCallback)

    it('should call successCalback when fetch returns true', async () => {
        const wasOk = await checkService.execute('https://www.google.com')

        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });

    it('should call errorCallback when fetch returns false', async () => {
        const wasOk = await checkService.execute('https://www.googlecscscscssc.com')

        expect(wasOk).toBeFalsy()
        expect(errorCallback).toHaveBeenCalled()
        expect(successCallback).not.toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
});