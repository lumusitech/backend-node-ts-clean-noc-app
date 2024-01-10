describe('App.ts', () => {
  it('should calls console.log with Hello World', async () => {
    // Arrange
    const logMock = jest.fn()
    console.log = logMock

    // Act
    await import('../src/app')

    // Assert
    expect(logMock).toHaveBeenCalledWith('Hello World')
  })
})
