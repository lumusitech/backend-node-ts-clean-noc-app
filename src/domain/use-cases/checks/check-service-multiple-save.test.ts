import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultipleSave } from "./check-service-multiple-save";

describe('CheckService UseCase Multiple Save', () => {

    beforeEach(() => jest.clearAllMocks())

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkServiceMultipleSave = new CheckServiceMultipleSave([mockRepository1, mockRepository2], successCallback, errorCallback)

    it('should call successCalback when fetch returns true', async () => {
        const wasOk = await checkServiceMultipleSave.execute('https://www.google.com')

        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });

    it('should call errorCallback when fetch returns false', async () => {
        const wasOk = await checkServiceMultipleSave.execute('https://www.googlecscscscssc.com')

        expect(wasOk).toBeFalsy()
        expect(errorCallback).toHaveBeenCalled()
        expect(successCallback).not.toHaveBeenCalled()
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
});