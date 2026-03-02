describe('Example Test Suite', () => {
  test('should pass a simple test', () => {
    expect(true).toBe(true);
  });

  test('should add numbers correctly', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  test('should handle strings', () => {
    const str = 'hello';
    expect(str).toContain('ell');
  });
});
